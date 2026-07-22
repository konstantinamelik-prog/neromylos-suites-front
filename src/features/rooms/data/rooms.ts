import standardRoomThumb from "@/assets/gallery/standard-room.jpg";
import standardRoom from "@/assets/gallery/standard-room-full.jpg";
import standardBathroom from "@/assets/gallery/standard-bathroom-full.jpg";
import superiorRoomThumb from "@/assets/gallery/superior-room.jpg";
import superiorRoom from "@/assets/gallery/superior-room-full.jpg";
import superiorBathroom from "@/assets/gallery/superior-bathroom.jpg";
import suiteThumb from "@/assets/gallery/suite.jpg";
import suite from "@/assets/gallery/suite-full.jpg";
import suiteBathroom from "@/assets/gallery/suite-bathroom-full.jpg";

export type Room = {
  slug: string;
  name: string;
  priceFrom: number;
  description: string;
  thumbnail: string; // μικρή εικόνα, για την κάρτα preview στην αρχική
  images: string[]; // μεγάλες εικόνες, για τη σελίδα λεπτομερειών
};

// TODO: στατικά δεδομένα. Να αντικαταστήσω από backend
export const rooms: Room[] = [
  {
    slug: "standard",
    name: "Standard",
    priceFrom: 65,
    description:
      "Άνετο, λιτό δωμάτιο με πέτρα και θέα στην αυλή, ιδανικό για σύντομη διαμονή.",
    thumbnail: standardRoomThumb,
    images: [standardRoom, standardBathroom],
  },
  {
    slug: "superior",
    name: "Superior",
    priceFrom: 95,
    description:
      "Πιο ευρύχωρο δωμάτιο με τζάκι και καθιστικό, δίπλα στο ρέμα του παλιού μύλου.",
    thumbnail: superiorRoomThumb,
    images: [superiorRoom, superiorBathroom],
  },
  {
    slug: "suite",
    name: "Suite",
    priceFrom: 140,
    description:
      "Η μεγαλύτερη σουίτα μας, με king-sized κρεβάτι, τζάκι και ιδιωτική πρόσβαση στον κήπο.",
    thumbnail: suiteThumb,
    images: [suite, suiteBathroom],
  },
];
