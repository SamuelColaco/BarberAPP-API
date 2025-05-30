
export interface IHashProvider{
    hash(password: string): Promise<string>
}