export interface IBaseWorkPlace {
  id: number
  x: number
  y: number
  planId: number
  employeeId: number
}

export interface IWorkPlace {
  id: number
  x: number
  y: number
  name: IName
}

export interface IPlan {
  id: number
  name: string
  img: string
  width: number
  height: number
}

export interface IFullPlan extends IPlan {
  workPlace: IBaseWorkPlace[]
}

export interface IName {
  id: number
  name: string | null | undefined
}
