export type IcreateMaterialMaster = {
    title: String | undefined,
    subject: String | undefined,
    std: String | undefined,
    duration: String | undefined,
    description: String | undefined,
    thumbnailUrl: String | undefined,
    contentUrl: String | undefined,
    durationInSeconds: String | undefined,
    contentType: String[],
    textContent: String | undefined,
}

export type IUpdateMaterialMaster = {
    id: Number,
    title: String | undefined,
    subject: String | undefined,
    std: String | undefined,
    duration: String | undefined,
    description: String | undefined,
    thumbnailUrl: String | undefined,
    contentUrl: String | undefined,
    durationInSeconds: String | undefined,
    contentType: String[],
    textContent: String | undefined,
}