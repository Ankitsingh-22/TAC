import React from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

const RecentActivityFeed = () => {
  // Placeholder data
  const activities = [
    "Admin John Doe updated student records.",
    "New job posting created by Admin Jane Smith.",
    "Support ticket resolved by Admin Bob Brown.",
    "Company profile updated by Admin Alice Green."
  ];

  return (
    <Box mb={6}>
      <Heading size="md" mb={4}>Recent Activity</Heading>
      <List spacing={3}>
        {activities.map((activity, index) => (
          <ListItem key={index}>
            <Text>{activity}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentActivityFeed;
