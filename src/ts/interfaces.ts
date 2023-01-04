export interface IHoleData {
  hole: number,
  yards: number,
  par: number
}

export interface ICourseData {
  name: string,
  holes: number,
  par: number,
  yards: number,
  holesData: IHoleData[]
}

export interface IRoundData {
  id: number,
  course: string,
  score: number
}
