'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { 
  Globe, 
  ShieldAlert, 
  ShieldCheck, 
  Info, 
  Search, 
  Map as MapIcon,
  AlertTriangle,
  Scale,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface CountryData {
  id: string;
  name: string;
  status: 'Secular' | 'State Religion' | 'Religious Law' | 'Hostile';
  blasphemy: 'None' | 'Fines' | 'Imprisonment' | 'Death Penalty';
  description: string;
  score: number; // 0-100 Secularism Score
}

export default function SecularMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [secularData, setSecularData] = useState<Record<string, CountryData>>({});
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'map_locations'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Record<string, CountryData> = {};
      snapshot.docs.forEach(doc => {
        const d = doc.data();
        const isoCode = d.isoCode || doc.id; // Fallback to doc.id if isoCode is missing
        data[isoCode] = {
          id: isoCode,
          name: d.country,
          status: d.status,
          blasphemy: d.blasphemy,
          score: d.score,
          description: d.description
        };
      });
      setSecularData(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'map_locations');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!svgRef.current || Object.keys(secularData).length === 0) return;

    const width = 1200;
    const height = 600;
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const projection = d3.geoMercator()
      .scale(150)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((data: any) => {
      const countries = topojson.feature(data, data.objects.countries) as any;

      svg.selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("class", "country-path transition-colors duration-300 cursor-pointer")
        .attr("fill", (d: any) => {
          const country = secularData[d.id] || secularData[d.properties.name];
          if (!country) return "#f3f4f6"; // Default gray
          
          // Color scale based on score
          if (country.score > 80) return "#ef4444"; // Strong Secular (Red accent)
          if (country.score > 50) return "#f87171"; // Moderate
          if (country.score > 20) return "#4b5563"; // Low
          return "#111827"; // Theocratic/Hostile
        })
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 0.5)
        .on("mouseenter", (event, d: any) => {
          const country = secularData[d.id] || secularData[d.properties.name];
          setHoveredCountry(country?.name || d.properties.name);
          d3.select(event.currentTarget).attr("stroke", "#ef4444").attr("stroke-width", 1.5);
        })
        .on("mouseleave", (event) => {
          setHoveredCountry(null);
          d3.select(event.currentTarget).attr("stroke", "#ffffff").attr("stroke-width", 0.5);
        })
        .on("click", (event, d: any) => {
          const country = secularData[d.id] || secularData[d.properties.name];
          if (country) setSelectedCountry(country);
        });

      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-6 px-4 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
              <Globe className="w-3 h-3" />
              Global Monitoring
            </span>
            <h1 className="text-6xl md:text-8xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.9] mb-8">
              Secular <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Map</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
              An interactive visualization of the global status of secularism, freedom of thought, and the prevalence of blasphemy laws.
            </p>
          </motion.div>
        </div>

        {/* Map Container */}
        <div className="relative bg-gray-50 dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-zinc-800 p-8 md:p-12 mb-12 shadow-2xl shadow-black/5 overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm z-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin" />
                <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-500">Loading Global Data...</span>
              </div>
            </div>
          )}

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hoveredCountry && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-12 left-12 bg-white dark:bg-zinc-800 px-6 py-3 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700 z-10 pointer-events-none"
              >
                <span className="text-xs font-outfit font-black uppercase tracking-widest text-gray-900 dark:text-white">
                  {hoveredCountry}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <svg ref={svgRef} className="w-full h-auto max-h-[600px]"></svg>

          {/* Legend */}
          <div className="absolute bottom-12 left-12 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-600 rounded-full" />
              <span className="text-[10px] font-outfit font-bold uppercase tracking-widest text-gray-500">Strongly Secular</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-600 rounded-full" />
              <span className="text-[10px] font-outfit font-bold uppercase tracking-widest text-gray-500">Moderate / Low</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-zinc-950 rounded-full" />
              <span className="text-[10px] font-outfit font-bold uppercase tracking-widest text-gray-500">Theocratic / Hostile</span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selected Country Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <motion.div
                  key={selectedCountry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-zinc-800 shadow-xl"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-space font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-2">
                        {selectedCountry.name}
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-outfit font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                          selectedCountry.status === 'Secular' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                          selectedCountry.status === 'State Religion' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {selectedCountry.status}
                        </span>
                        <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">
                          Secularism Score: {selectedCountry.score}/100
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400 mb-2">Blasphemy Laws</span>
                      <div className="flex items-center gap-2 text-red-600 font-space font-bold uppercase">
                        <ShieldAlert className="w-5 h-5" />
                        {selectedCountry.blasphemy}
                      </div>
                    </div>
                  </div>

                  <p className="text-xl text-gray-600 dark:text-zinc-400 font-serif italic leading-relaxed mb-12">
                    &ldquo;{selectedCountry.description}&rdquo;
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800">
                      <Scale className="w-6 h-6 text-red-600 mb-4" />
                      <h4 className="text-xs font-space font-bold uppercase text-gray-900 dark:text-white mb-2">Legal Status</h4>
                      <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-medium uppercase tracking-widest">Constitutional Secularism</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800">
                      <AlertTriangle className="w-6 h-6 text-red-600 mb-4" />
                      <h4 className="text-xs font-space font-bold uppercase text-gray-900 dark:text-white mb-2">Risk Level</h4>
                      <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-medium uppercase tracking-widest">Low for Non-Believers</p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800">
                      <ExternalLink className="w-6 h-6 text-red-600 mb-4" />
                      <h4 className="text-xs font-space font-bold uppercase text-gray-900 dark:text-white mb-2">Full Report</h4>
                      <p className="text-[10px] text-gray-500 dark:text-zinc-500 font-medium uppercase tracking-widest">View Detailed Analysis</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-zinc-800 p-12 text-center">
                  <MapIcon className="w-12 h-12 text-gray-300 mb-6" />
                  <h3 className="text-2xl font-space font-black uppercase text-gray-400">Select a country</h3>
                  <p className="text-gray-500 dark:text-zinc-500 max-w-xs mx-auto mt-2">Click on a highlighted country to view its secularism profile and legal status.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Stats / Sidebar */}
          <div className="space-y-8">
            <div className="bg-zinc-900 dark:bg-white rounded-[2rem] p-8 text-white dark:text-zinc-950 border border-zinc-800 dark:border-zinc-200">
              <h3 className="text-2xl font-space font-black uppercase tracking-tight mb-6">Global <br />Overview</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-zinc-800 dark:border-zinc-100 pb-4">
                  <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-500">Death Penalty</span>
                  <span className="text-2xl font-space font-black text-red-600">13</span>
                </div>
                <div className="flex justify-between items-end border-b border-zinc-800 dark:border-zinc-100 pb-4">
                  <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-500">Imprisonment</span>
                  <span className="text-2xl font-space font-black text-red-600">42</span>
                </div>
                <div className="flex justify-between items-end border-b border-zinc-800 dark:border-zinc-100 pb-4">
                  <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-zinc-500">State Religion</span>
                  <span className="text-2xl font-space font-black text-red-600">27</span>
                </div>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-medium mt-8 leading-relaxed">
                Data compiled from the International Humanist and Ethical Union (IHEU) Freedom of Thought Report.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
              <h4 className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400 mb-6">Take Action</h4>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-6 leading-relaxed">
                Help us monitor and report on secularism worldwide. Your reports help protect the rights of non-believers.
              </p>
              <Link 
                href="/contact"
                className="inline-block w-full text-center bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white py-4 rounded-xl font-outfit font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all"
              >
                Report an Incident
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
