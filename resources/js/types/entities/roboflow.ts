export type DetectionType = {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class:
    | "Chair"
    | "Sofa"
    | "Table"
    | "computer chair"
    | "computer table"
    | "couch"
    | "dining chair"
    | "ironing table"
    | "metal chair"
    | "office table"
    | "plastic chair"
    | "restaurant chair"
    | "study table"
    | "wooden chair"
    | "wooden sofa"
    | "wooden table";
  class_id: number;
  detection_id: string;
};

export type PredictionType = {
  predictions: DetectionType[];
};
