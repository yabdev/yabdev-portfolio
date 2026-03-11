// Shared service pricing configuration
// Prices are stored in localStorage so the admin can adjust them from the admin panel.
// The services page reads from this config at render time.

export interface ServicePricing {
    name: string;
    price: number;
}

const STORAGE_KEY = "yabbydev_service_prices";

export const defaultPrices: ServicePricing[] = [
    { name: "Business Website Template", price: 150000 },
    { name: "E-Commerce Platform", price: 350000 },
    { name: "Enterprise Web Application", price: 500000 },
    { name: "API & Backend Development", price: 400000 },
    { name: "Seminar Paper", price: 30000 },
    { name: "Project Writing", price: 50000 },
    { name: "Manuscript / Thesis", price: 80000 },
];

export function getServicePrices(): ServicePricing[] {
    if (typeof window === "undefined") return defaultPrices;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch {
        // ignore
    }
    return defaultPrices;
}

export function saveServicePrices(prices: ServicePricing[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
}

export function getPriceForService(name: string): number {
    const prices = getServicePrices();
    const found = prices.find(p => p.name === name);
    return found?.price ?? defaultPrices.find(p => p.name === name)?.price ?? 0;
}
