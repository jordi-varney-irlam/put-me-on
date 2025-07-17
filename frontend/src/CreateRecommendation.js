import React, { useState } from 'react';
import { Box, Input, Textarea, Select, Button, VStack, Heading } from '@chakra-ui/react';

const CreateRecommendation = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(''); //this will be passed in or hardcoded for now

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRec = { category, title, description, userId };

    try {
      const res = await fetch('http://localhost:5001/api/recs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRec),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Recommendation submitted!');
        setCategory('');
        setTitle('');
        setDescription('');
        // possibly refresh or update rec list
      } else {
        alert(data.message || 'Error submitting recommendation');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="lg">
      <Heading size="md" mb={4}>Create a Recommendation</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Select
            placeholder="Select category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Movie">Movie</option>
            <option value="Book">Book</option>
            <option value="Location">Location</option>
            <option value="Activity">Activity</option>
            <option value="Music">Music</option>
            <option value="App">App</option>
          </Select>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button colorScheme="purple" type="submit" width="100%">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateRecommendation;

