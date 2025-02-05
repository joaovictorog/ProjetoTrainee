export function ordenarAlfabetica(array: any[]): any[] {
    return array.sort((a, b) => a.Nome.localeCompare(b.Nome));
}
