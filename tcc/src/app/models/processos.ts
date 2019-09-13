import { ProcessosSetor } from './processosSetor';

export interface Page  {
    content: Array<ProcessosSetor>;
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    sort: Sort;
    first: boolean;
    empty: boolean;
};

export interface Processos {
    id: number;
    nomeProcesso: string;
    dataCriacao: Date;
    situacao: string;
    
};

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
};

export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
};

export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
};

