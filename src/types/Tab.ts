'use client';
import React from 'react';

export interface Tab {
    id: number;
    label: string;
    component: React.ReactNode;
}
