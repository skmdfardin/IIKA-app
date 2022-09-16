import { createSlice } from '@reduxjs/toolkit';

// "Pond": 13,
//  "description": "Description",
//   "id": 4,
//    "invest_amount": 5555,
//     "lastupdatedt": "2022-09-15",
//      "numbers_of_larva": 5555,
//       "pondPrep_cost": 55555,

const cycleSclice = createSlice({
  name: 'cycleStore',
  initialState: {
    pondID: Number,
    cyclepondName: '',
    cycleID: Number,
    cycleDescription: '',
    investAmount: Number,
    podPrepCost: Number,
    seedDate: '',
    speciesPLStage: '',
    numberOfLarve: Number,
  },
  reducers: {
    storeCyclePondID: (storeCyclePondID, action) => {
      storeCyclePondID.pondID = action.payload.pondID;
    },
    storeCyclePondName: (storeCyclePondName, action) => {
      storeCyclePondName.cyclepondName = action.payload.cyclepondName;
    },
    storeNoLarve: (storeNoLarve, action) => {
      storeNoLarve.numberOfLarve = action.payload.numberOfLarve;
    },
    storeCycleID: (storeCycleID, action) => {
      storeCycleID.cycleID = action.payload.cycleID;
    },
    storeCycleDescription: (storeCycleDescription, action) => {
      storeCycleDescription.cycleDescription = action.payload.cycleDescription;
    },
    storeInvestAmount: (storeInvestAmount, action) => {
      storeInvestAmount.investAmount = action.payload.investAmount;
    },
    storePondPrepCost: (storePondPrepCost, action) => {
      storePondPrepCost.podPrepCost = action.payload.podPrepCost;
    },
    storeSeedingDate: (storeSeedingDate, action) => {
      storeSeedingDate.seedDate = action.payload.seedDate;
    },
    storePlStage: (storePlStage, action) => {
      storePlStage.speciesPLStage = action.payload.speciesPLStage;
    },
  },
});

export const {
  storeCyclePondID,
  storeCycleID,
  storeCycleDescription,
  storeInvestAmount,
  storePondPrepCost,
  storeSeedingDate,
  storeNoLarve,
  storePlStage,
  storeCyclePondName,
} = cycleSclice.actions;

export default cycleSclice.reducer;
