export interface ServicePageData {
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  intro: string[];
  sections: { title: string; description: string; items: string[] }[];
  audience: string[];
  ctaTitle: string;
  ctaDescription: string;
}
