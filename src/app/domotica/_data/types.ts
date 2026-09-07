export interface FeatureItem {
  label: string;
  value: string;
}

export interface ComponentItem {
  name: string;
  type: string;
  qty: string;
}

export interface DomoticSystem {
  id: string;
  category: string;
  name: string;
  badge: string;
  imageUrl: string | null;
  targetAudience: string;
  needsCovered: string[];
  features: FeatureItem[];
  loadCapacity: FeatureItem[];
  sitePreparation: string[];
  installation: string;
  investment: string;
  maintenance: string;
  components: ComponentItem[];
}
