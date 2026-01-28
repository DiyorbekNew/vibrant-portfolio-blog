import React from "react";
import Layout from "../components/Layout";
import SEO from "@/components/SEO";
import { useGeneralData, useExperiences, useSkillCategories } from "@/hooks/useApi";
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  SkillsSection,
} from "@/components/sections";

const Index: React.FC = () => {
  const { data: generalData } = useGeneralData();
  const { data: experiences = [] } = useExperiences();
  const { data: skillCategories = [] } = useSkillCategories();

  return (
    <Layout>
      <SEO
        title="Diyorbek Xazratqulov - Men Haqimda"
        description="Python backend dasturchi Diyorbek Xazratqulovning shaxsiy portfoliosi. Ish tajribasi, ko'nikmalar va loyihalar."
        url="/"
      />

      <HeroSection generalData={generalData} />
      <AboutSection about={generalData?.about} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection skillCategories={skillCategories} />
    </Layout>
  );
};

export default Index;
