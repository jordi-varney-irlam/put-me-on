import React, { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  Icon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { apiFetch } from '../api';
import { getCategory } from '../categories';

const MotionBox = motion(Box);

const timeAgo = (iso) => {
  if (!iso) return '';
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [name, secs] of units) {
    const n = Math.floor(seconds / secs);
    if (n >= 1) return `${n} ${name}${n > 1 ? 's' : ''} ago`;
  }
  return 'just now';
};

const RecommendationItem = ({ rec, isOwner, onDeleted, index = 0 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();
  const cat = getCategory(rec.category);
  const author = rec.userId?.username || 'Unknown';

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiFetch(`/api/recs/${rec._id}`, { method: 'DELETE', auth: true });
      toast({ title: 'Recommendation deleted', status: 'success', duration: 2000 });
      onClose();
      onDeleted(rec._id);
    } catch (err) {
      toast({ title: 'Delete failed', description: err.message, status: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <MotionBox
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
        bg="white"
        borderRadius="card"
        boxShadow="soft"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        whileHover={{ y: -4 }}
        _hover={{ boxShadow: 'lift' }}
        style={{ transition: 'box-shadow 0.25s ease' }}
        role="group"
      >
        <Box h="6px" bg={`${cat.color}.300`} />
        <Flex direction="column" p={5} flex="1">
          <Flex justify="space-between" align="flex-start" mb={3}>
            <Badge
              colorScheme={cat.color}
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              textTransform="none"
              display="inline-flex"
              alignItems="center"
            >
              <Icon as={cat.icon} mr={1} /> {cat.value}
            </Badge>

            {isOwner && (
              <Tooltip label="Delete" hasArrow>
                <IconButton
                  aria-label="Delete recommendation"
                  icon={<span>🗑️</span>}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  opacity={{ base: 1, md: 0 }}
                  _groupHover={{ opacity: 1 }}
                  _focus={{ opacity: 1 }}
                  onClick={onOpen}
                />
              </Tooltip>
            )}
          </Flex>

          <Heading size="md" mb={2} letterSpacing="-0.01em" wordBreak="break-word">
            {rec.title}
          </Heading>
          <Text color="gray.600" flex="1" whiteSpace="pre-wrap" wordBreak="break-word" noOfLines={6}>
            {rec.description}
          </Text>

          <HStack mt={5} pt={4} borderTop="1px solid" borderColor="gray.100" spacing={3}>
            <Avatar size="xs" name={author} bg="purple.400" color="white" />
            <Text fontSize="sm" fontWeight={600} color="gray.700">
              {author}
              {isOwner && (
                <Text as="span" color="purple.500" fontWeight={500}>
                  {' '}
                  (you)
                </Text>
              )}
            </Text>
            <Text fontSize="xs" color="gray.400" ml="auto !important">
              {timeAgo(rec.createdAt)}
            </Text>
          </HStack>
        </Flex>
      </MotionBox>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
        <AlertDialogOverlay backdropFilter="blur(4px)">
          <AlertDialogContent borderRadius="card" mx={4}>
            <AlertDialogHeader>Delete recommendation?</AlertDialogHeader>
            <AlertDialogBody>
              "{rec.title}" will be removed for everyone. This can't be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} isLoading={deleting} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RecommendationItem;
