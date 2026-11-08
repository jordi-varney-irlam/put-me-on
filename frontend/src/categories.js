// Must stay in sync with the enum in backend/models/Rec.js

// importing icons for categories from react-icons
import { MdMovie, MdOutlineOndemandVideo, MdLibraryMusic } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiTargetFill } from "react-icons/ri";
import { IoApps } from "react-icons/io5";
import { BiSolidSmile } from "react-icons/bi";




export const CATEGORIES = [
  { value: 'Movie', icon: MdMovie, color: 'pink' },
  { value: 'Show', icon: MdOutlineOndemandVideo, color: 'red' },
  { value: 'Book', icon: FaBook, color: 'orange' },
  { value: 'Music', icon: MdLibraryMusic, color: 'purple' },
  { value: 'Location', icon: FaLocationDot, color: 'teal' },
  { value: 'Activity', icon: RiTargetFill, color: 'green' },
  { value: 'App', icon: IoApps, color: 'blue' },
  { value: 'Other', icon: BiSolidSmile, color: 'yellow' }
];

export const getCategory = (value) =>
  CATEGORIES.find((c) => c.value === value) || { value, icon: BiSolidSmile, color: 'gray' };
