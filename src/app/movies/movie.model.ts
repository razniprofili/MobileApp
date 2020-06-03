// export interface Movie {
//     id: string;
//     naziv: string;
//     zanr: string;
//     glumci: string;
//     ocena: any;
//     datum: any;
//     komentar: string;
//     reziser: string;
//     trajanje: any;
//     zemlja: string;
//     godina: any;
// }

export class Movie {
    constructor(
        public id: string,
        public naziv: string,
        public glumci: string,
        public reziser: string,
        public zanr: string,
        public godina: any,
        public trajanje: any,
        public datum: any,
        public ocena: any,
        public komentar: string,
        public zemlja: string,
        public userId: string
    ) {}
}