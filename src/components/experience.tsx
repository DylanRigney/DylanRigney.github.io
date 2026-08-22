"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "../context/theme-context";

import { GlassCard } from "./ui/GlassCard";

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40 w-full max-w-[60rem]">
      <SectionHeading>My experience</SectionHeading>
      
      <GlassCard id="experience-card" className="p-8 mt-8">
        <VerticalTimeline lineColor="rgba(30, 41, 59, 0.2)">
          {experiencesData.map((item, index) => (
            <React.Fragment key={index}>
              <VerticalTimelineElement
                visible
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.55)",
                  boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.06), inset 0 1.5px 1px rgba(255, 255, 255, 0.8), inset 0 -1px 1px rgba(15, 23, 42, 0.05)",
                  border: "1.5px solid rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(16px)",
                  textAlign: "left",
                  padding: "1.5rem 2rem",
                  borderRadius: "1.25rem"
                }}
                contentArrowStyle={{
                  borderRight: "0.4rem solid rgba(255, 255, 255, 0.7)",
                }}
                date={item.date}
                dateClassName="text-[#d05459] font-semibold ml-4 mr-4"
                icon={item.icon}
                iconStyle={{
                  background: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.15), 0 0 15px rgba(186, 230, 253, 0.3), inset 0 1.5px 1px rgba(255, 255, 255, 0.9)",
                  border: "1.5px solid rgba(255, 255, 255, 0.8)",
                  color: "rgba(15, 23, 42, 0.9)",
                  fontSize: "1.5rem",
                }}
              >
                <h3 className="font-bold text-[#0f172a] tracking-wide">{item.title}</h3>
                <p className="font-medium !mt-0 text-[#d05459]/80">{item.location}</p>
                <p className="!mt-4 !font-normal text-[#334155] !leading-relaxed">
                  {item.description}
                </p>
              </VerticalTimelineElement>
            </React.Fragment>
          ))}
        </VerticalTimeline>
      </GlassCard>
    </section>
  );
}
