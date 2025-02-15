interface NpmPackage {
    package: string;
    downloads: Array<{
        day: string;
        downloads: number;
    }>;
}