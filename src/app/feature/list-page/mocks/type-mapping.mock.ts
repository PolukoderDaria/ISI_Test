import { MappingItem } from "../models/mapping.interface";
import { UserType } from "../models/user-type.enum";

export const typeMapping: MappingItem[] = [
  {
    key: 0,
    label: UserType.ADMINISTRATOR,
  },
  {
    key: 1,
    label: UserType.USER,
  },
];
