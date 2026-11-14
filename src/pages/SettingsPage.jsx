import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SettingsView from '../sections/SettingsView';

export default function SettingsPage() {
  const { finance } = useOutletContext();

  return (
    <SettingsView 
      settings={finance.settings}
      updateSettings={finance.updateSettings}
      resetToDefault={finance.resetToDefault}
    />
  );
}
