import { StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import { MotionView } from './motion';
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
    <MotionView variant="fadeInUp" delay={160} styles={styles.container}>
      <SegmentedButtons
        value={activeFilter}
        onValueChange={(value) => onFilterChange(value as TaskFilter)}
        buttons={[
          { value: 'all', label: 'All' },
          { value: 'active', label: 'Active' },
          { value: 'completed', label: 'Completed' },
        ]}
      />
    </MotionView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});
