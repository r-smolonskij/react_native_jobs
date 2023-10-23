import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch'


const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch('search', { query: "React developer", num_pages: 1 });
  const [selectedJob, setSelectedJob] = useState()

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}
        {!isLoading && error && <Text>Something went wrong</Text>}
        {!isLoading && !error &&
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                selectedJob={selectedJob}
                item={item}
                handleCardPress={handleCardPress}
              />)}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
        }
      </View>
    </View>
  )
}

export default Popularjobs