import type { Entity } from './types';

const escapeCsvCell = (cellData: string | undefined | null): string => {
    if (cellData === null || cellData === undefined) {
        return '';
    }
    const stringData = String(cellData);
    if (stringData.includes(',') || stringData.includes('"') || stringData.includes('\n')) {
        const escapedData = stringData.replace(/"/g, '""');
        return `"${escapedData}"`;
    }
    return stringData;
};

export const exportToCsv = (entities: Entity[], filename: string): void => {
    const headers = ['ID', 'Name', 'Address', 'Website', 'Phone', 'Facebook', 'Latitude', 'Longitude'];
    const csvRows = [headers.join(',')];

    entities.forEach(entity => {
        const row = [
            escapeCsvCell(entity.id),
            escapeCsvCell(entity.name),
            escapeCsvCell(entity.address),
            escapeCsvCell(entity.website),
            escapeCsvCell(entity.phone),
            escapeCsvCell(entity.facebook),
            escapeCsvCell(String(entity.lat)),
            escapeCsvCell(String(entity.lon)),
        ];
        csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};
