export const updateObject = <T> (obj: T, props: Partial<T>): T => ({
    ...obj,
    ...props
})