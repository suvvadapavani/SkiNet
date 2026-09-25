export type Pagination<T>= {
    PageIndex: number;
    PageSize: number;
    count: number;
    data: T[];
}