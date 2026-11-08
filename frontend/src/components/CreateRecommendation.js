import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useToast,
  Icon
} from '@chakra-ui/react';
import { apiFetch } from '../api';
import { CATEGORIES } from '../categories';

const MAX_DESCRIPTION = 500;

/** Modal form for posting a new recommendation. */
const CreateRecommendation = ({ isOpen, onClose, onCreated, onAuthExpired }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const reset = () => {
    setCategory('');
    setTitle('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      toast({ title: 'Pick a category first', status: 'warning', duration: 2000 });
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch('/api/recs', {
        method: 'POST',
        auth: true,
        body: { category, title: title.trim(), description: description.trim() },
      });
      toast({ title: 'Recommendation posted! 🎉', status: 'success', duration: 2500 });
      reset();
      onClose();
      onCreated();
    } catch (err) {
      if (err.status === 401) {
        onAuthExpired?.();
        onClose();
      }
      toast({ title: "Couldn't post recommendation", description: err.message, status: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(6px)" />
      <ModalContent as="form" onSubmit={handleSubmit} borderRadius="card" mx={4}>
        <ModalHeader>Put people on to something</ModalHeader>
        <ModalCloseButton borderRadius="full" />
        <ModalBody>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <SimpleGrid columns={{ base: 3, sm: 4 }} spacing={2}>
                {CATEGORIES.map((c) => {
                  const selected = category === c.value;
                  return (
                    <Button
                      key={c.value}
                      type="button"
                      size="sm"
                      variant={selected ? 'solid' : 'outline'}
                      colorScheme={selected ? 'purple' : 'gray'}
                      onClick={() => setCategory(c.value)}
                      aria-pressed={selected}
                      leftIcon={<Icon as={c.icon} />}
                    >
                      {c.value}
                    </Button>
                  );
                })}
              </SimpleGrid>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="e.g. Spirited Away"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                borderRadius="xl"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Why should people check it out?</FormLabel>
              <Textarea
                placeholder="Tell us what makes it great…"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION))}
                rows={5}
                borderRadius="xl"
                resize="vertical"
              />
              <FormHelperText textAlign="right">
                <Text as="span" color={description.length >= MAX_DESCRIPTION ? 'red.500' : undefined}>
                  {description.length}/{MAX_DESCRIPTION}
                </Text>
              </FormHelperText>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={submitting} loadingText="Posting">
            Post it
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRecommendation;
