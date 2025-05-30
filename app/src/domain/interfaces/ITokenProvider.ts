
export interface ITokenProvider{
    generate(payload: Record<string, unknown>, options?: { subject: string}): string
}