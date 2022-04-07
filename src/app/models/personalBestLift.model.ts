export interface PersonalBestLift {
  liftName: string;
  results: {
    oneRepMax: {
      result: number;
      date: string;
    };
    twoRepMax: {
      result: number;
      date: string;
    };
    threeRepMax: {
      result: number;
      date: string;
    };
    fiveRepMax: {
      result: number;
      date: string;
    };
    tenRepMax: {
      result: number;
      date: string;
    };
  };
}
