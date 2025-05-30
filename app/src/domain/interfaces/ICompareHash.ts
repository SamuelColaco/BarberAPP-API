
export interface ICompareHash{
    compare(password: string, passwordHash: string): Promise<boolean>
}