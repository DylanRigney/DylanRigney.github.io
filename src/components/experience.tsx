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
                  background: "rgba(248, 250, 252, 0.75)",
                  boxShadow: "inset 0 0 20px rgba(30, 41, 59, 0.05), 0 8px 32px rgba(0, 0, 0, 0.1)",
                  border: "1.5px solid rgba(30, 41, 59, 0.2)",
                  backdropFilter: "blur(12px)",
                  textAlign: "left",
                  padding: "1.5rem 2rem",
                  borderRadius: "1rem"
                }}
                contentArrowStyle={{
                  borderRight: "0.4rem solid rgba(30, 41, 59, 0.2)",
                }}
                date={item.date}
                dateClassName="text-[#f43f5e] font-medium ml-4 mr-4"
                icon={item.icon}
                iconStyle={{
                  background: "rgba(248, 250, 252, 0.95)",
                  boxShadow: "0 0 15px rgba(244, 63, 94, 0.2)",
                  border: "1.5px solid rgba(30, 41, 59, 0.2)",
                  color: "rgba(15, 23, 42, 0.9)",
                  fontSize: "1.5rem",
                }}
              >
                <h3 className="font-bold text-[#0f172a] tracking-wide">{item.title}</h3>
                <p className="font-medium !mt-0 text-[#f43f5e]/80">{item.location}</p>
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
