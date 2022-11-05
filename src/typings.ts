// interface Register {
// id?: string;
// fullname: string;
// username: string;
// email: string;
// password: string;
// confirmPassword: string;
// }

// interface Login {
// email: string;
// password: string;
// }

export interface Register {
    id: number
    firstname: string
    lastname: string
    emailaddress: string
    password: string
    confirmPassword: string
}
  
export interface Login {
    emailaddress: string
    password: string
}

export interface Author {
    id: number
    author: string
    dateRegistered: Date
    age: number
    address: string
    books: Book[]
}
export interface Book {
    id: number
    name: string
    isPublished: boolean
    datePublished: Date
    serialNumber: number
}
