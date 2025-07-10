interface Course {
    id: number,
    title: string,
    author: string,
    genre: string,
    rating: number, 
    description: string,
    coverUrl: string,
    coverColor: string,
    summary: string,
    totalCopies: number,
    isLoaded?: boolean,
}