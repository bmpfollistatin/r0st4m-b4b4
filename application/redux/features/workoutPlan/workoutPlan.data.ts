export interface workoutPlanModel {
  id: number;
  workoutIdList: Array<number>;
  workoutPlan_name: string;
  notes: string;
}

export const workoutPlanDb:workoutPlanModel[] = [
  {
    id: 1,
    workoutIdList: [1, 2, 3, 4, 5, 6, 7],
    workoutPlan_name: "Chisel",
    notes: "",
  },
  {
    id: 2,
    workoutIdList: [12, 13, 14, 15],
    workoutPlan_name: "SWOLE pt 2",
    notes: "",
  },
  {
    id: 3,
    workoutIdList: [16, 17, 18, 19, 20],
    workoutPlan_name: "SWOLE pt 3",
    notes: "",
  },
  {
    id: 4,
    workoutIdList: [21, 22, 23, 24, 25, 26],
    workoutPlan_name: "SWOLE pt 4",
    notes: "",
  },
  {
    id: 5,
    workoutIdList: [27, 28, 29, 30, 31],
    workoutPlan_name: "SWOLE pt 5",
    notes: "",
  },
];
