import { StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import { TaskFilter } from '../types/Task';

interface FilterTabsProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export default function FilterTabs({
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  return (
    <SegmentedButtons
      value={activeFilter}
      onValueChange={(value) => onFilterChange(value as TaskFilter)}
      style={styles.container}
      buttons={[
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});
