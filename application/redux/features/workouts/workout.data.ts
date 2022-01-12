export interface WorkoutModel {
  id?: number;
  exerciseIdList?: Array<number>;
  name: string;
  notes?: string;
  isDeleted?: boolean;
  workoutPlanId?: number;
}

export const WorkoutsDb = [
  {
    id: 1,
    exerciseIdList: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    name: "Chest, Cardio, Abs",
    notes: "",
    workoutPlanId: 1
  },
  {
    id: 2,
    exerciseIdList: [19, 18, 17, 16, 15, 14, 13, 12],
    name: "Abs, Cardio, Arms",
    notes: "",
    workoutPlanId: 1
  },
  {
    id: 3,
    exerciseIdList: [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20],
    name: "Back, Cardio, Abs",
    notes: "",
    workoutPlanId: 1
  },
  {
    id: 4,
    exerciseIdList: [41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
    name: "Cardio, Abs, Shoulders",
    notes: "",
    workoutPlanId: 1
  },
  {
    id: 5,
    exerciseIdList: [52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42],
    name: "Legs, Cardio, Abs",
    notes: "",
    workoutPlanId: 1
  },
  {
    id: 6,
    exerciseIdList: [59, 58, 57, 56, 55, 54, 53],
    name: "Chest",
    notes: "",
    workoutPlanId: 1
  },
  {
    id: 7,
    exerciseIdList: [63, 62, 61, 60],
    name: "Arms",
    notes: "",
    workoutPlanId: 1
  },
  {
    id: 8,
    exerciseIdList: [64, 65, 66, 67, 68],
    name: "Chest, Back",
    notes: "",
  },
  {
    id: 9,
    exerciseIdList: [69, 70, 71, 72, 73],
    name: "Legs, Abs",
    notes: "",
  },
  {
    id: 10,
    exerciseIdList: [74, 75, 76, 77],
    name: "Arms",
    notes: "",
  },
  {
    id: 11,
    exerciseIdList: [78, 79, 80, 81],
    name: "Shoulders, Abs",
    notes: "",
  },
  {
    id: 12,
    exerciseIdList: [82, 83, 84, 85, 86, 87, 88],
    name: "Shoulders, Abs",
    notes: "",
    workoutPlanId: 2
  },
  {
    id: 13,
    exerciseIdList: [89, 90, 91, 92, 93, 94],
    name: "Legs",
    notes: "",
    workoutPlanId: 2
  },
  {
    id: 14,
    exerciseIdList: [95, 96, 97, 98, 99],
    name: "Arms",
    notes: "",
    workoutPlanId: 2
  },
  {
    id: 15,
    exerciseIdList: [100, 101, 102, 103, 104, 105, 106],
    name: "Shoulders, Abs",
    notes: "",
    workoutPlanId: 2
  },
  {
    id: 16,
    exerciseIdList: [107, 108, 109, 110],
    name: "Chest, Back",
    notes: "",
    workoutPlanId: 3
  },
  {
    id: 17,
    exerciseIdList: [111, 112, 113],
    name: "Legs",
    notes: "",
    workoutPlanId: 3
  },
  {
    id: 18,
    exerciseIdList: [114, 115],
    name: "Arms",
    notes: "",
    workoutPlanId: 3
  },
  {
    id: 19,
    exerciseIdList: [116, 117, 118, 119],
    name: "Shoulders, Abs",
    notes: "",
    workoutPlanId: 3
  },
  {
    id: 20,
    exerciseIdList: [120, 121, 122],
    name: "Cardio",
    notes: "",
    workoutPlanId: 3
  },
  {
    id: 21,
    exerciseIdList: [123, 124, 125, 126, 127],
    name: "Chest, Back",
    notes: "",
    workoutPlanId: 4
  },
  {
    id: 22,
    exerciseIdList: [128, 129, 130, 131, 132],
    name: "Arms",
    notes: "",
    workoutPlanId: 4
  },
  {
    id: 23,
    exerciseIdList: [133, 134, 135, 136, 137, 138, 139],
    name: "Legs",
    notes: "",
    workoutPlanId: 4
  },
  {
    id: 24,
    exerciseIdList: [140, 141, 142, 143, 144],
    name: "Chest, Back",
    notes: "",
    workoutPlanId: 4
  },
  {
    id: 25,
    exerciseIdList: [145, 146],
    name: "Arms",
    notes: "",
    workoutPlanId: 4
  },
  {
    id: 26,
    exerciseIdList: [147, 148, 149, 150, 151],
    name: "Legs",
    notes: "",
    workoutPlanId: 4
  },
  {
    id: 27,
    exerciseIdList: [152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162],
    name: "Chest, Triceps, Abs",
    notes: "",
    workoutPlanId: 5
  },
  {
    id: 28,
    exerciseIdList: [163, 164, 165, 166, 167, 168, 169, 170, 171, 172],
    name: "Back, Biceps, Abs",
    notes: "",
    workoutPlanId: 5
  },
  {
    id: 29,
    exerciseIdList: [
      173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184,
    ],
    name: "Legs, Abs",
    notes: "",
    workoutPlanId: 5
  },
  {
    id: 30,
    exerciseIdList: [
      185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196,
    ],
    name: "Shoulders, Abs",
    notes: "",
    workoutPlanId: 5
  },
  {
    id: 31,
    exerciseIdList: [197],
    name: "Cardio, Abs",
    notes: "",
    workoutPlanId: 5
  },
];
