export type Pagination<T>= {
    PageIndex: number;
    PageSize: number;
    Count: number;
    Data: T[];
}