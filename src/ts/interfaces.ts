export interface IHoleData {
  hole: number,
  yards: number,
  par: number
}

export interface IHoleRoundData {
  hole: number,
  shots: number,
  par: number
}

export interface ICourseData {
  name: string,
  holes: number,
  par: number,
  yards: number,
  holesData: string
}

export interface IRoundData {
  id: string,
  course: string,
  holesData: string,
  score: number
}
