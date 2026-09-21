"use client";

import { OpeningExperience } from "@/components/opening/OpeningExperience";
import { OriginExperience } from "@/components/origin/OriginExperience";
import { BeyondExperience } from "@/components/beyond/BeyondExperience";
import { CallExperience } from "@/components/call/CallExperience";
import { CurrentExperience } from "@/components/current/CurrentExperience";
import { EngineerExperience } from "@/components/engineer/EngineerExperience";
import { SoftwareExperience } from "@/components/software/SoftwareExperience";
import { UncertaintyExperience } from "@/components/uncertainty/UncertaintyExperience";
import { WritingExperience } from "@/components/writing/WritingExperience";

export function CinematicWorld() {
  return (
    <>
      <OpeningExperience />
      <OriginExperience />
      <UncertaintyExperience />
      <CallExperience />
      <SoftwareExperience />
      <EngineerExperience />
      <BeyondExperience />
      <WritingExperience />
      <CurrentExperience />
    </>
  );
}
