import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CreateRecommendation from '../components/CreateRecommendation';
import RecommendationItem from '../components/RecommendationItem';
import { apiFetch } from '../api';
import { CATEGORIES } from '../categories';
import { useAuth } from '../context/AuthContext';

const MotionBox = motion(Box);

const CardSkeleton = () => (
  <Box bg="white" borderRadius="card" boxShadow="soft" p={5}>
    <Skeleton h="22px" w="90px" borderRadius="full" mb={4} />
    <Skeleton h="24px" w="70%" mb={3} />
    <SkeletonText noOfLines={3} spacing={2} />
  </Box>
);

const HomePage = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const toast = useToast();
  const createModal = useDisclosure();

  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const fetchRecs = useCallback(async () => {
    setError(null);
    try {
      const data = await apiFetch('/api/recs');
      setRecs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching recs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecs();
  }, [fetchRecs]);

  const handleAuthExpired = () => {
    logout();
    toast({ title: 'Session expired', description: 'Please log in again.', status: 'warning' });
  };

  const counts = useMemo(() => {
    const c = { All: recs.length };
    recs.forEach((r) => {
      c[r.category] = (c[r.category] || 0) + 1;
    });
    return c;
  }, [recs]);

  const visibleRecs = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = recs.filter((r) => {
      if (activeCategory !== 'All' && r.category !== activeCategory) return false;
      if (!q) return true;
      return [r.title, r.description, r.userId?.username].some((f) => f?.toLowerCase().includes(q));
    });
    // API returns newest first
    return sort === 'oldest' ? [...filtered].reverse() : filtered;
  }, [recs, activeCategory, search, sort]);

  const isOwner = (rec) => Boolean(user && rec.userId && String(rec.userId._id) === String(user.id));

  const handleShareClick = () => {
    if (!isLoggedIn) {
      toast({ title: 'Log in to share a recommendation', status: 'info', duration: 2500 });
      return;
    }
    createModal.onOpen();
  };

  const filterChips = [{ value: 'All', emoji: '🌈' }, ...CATEGORIES];

  return (
    <Container maxW="1140px" px={4}>
      {/* Hero */}
      <MotionBox
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        textAlign="center"
        py={{ base: 8, md: 14 }}
      >
        <Heading
          as="h1"
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight={800}
          letterSpacing="-0.03em"
          lineHeight={1.05}
          mb={4}
        >
          Put me on to{' '}
          <Box as="span" bgGradient="linear(to-r, purple.600, purple.400)" bgClip="text">
            something good
          </Box>
          .
        </Heading>
        <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.600" maxW="560px" mx="auto" mb={8}>
          Movies, shows, books, music, places and more, recommended by real people.
        </Text>
        <Flex gap={3} justify="center" wrap="wrap">
          <Button size="lg" px={8} onClick={handleShareClick} boxShadow="lift">
            ＋ Share a recommendation
          </Button>
          {!isLoggedIn && (
            <Button as={Link} to="/createuser" size="lg" variant="outline" bg="white">
              Join the community
            </Button>
          )}
        </Flex>
      </MotionBox>

      {/* Controls */}
      <VStack spacing={4} align="stretch" mb={8}>
        <Flex gap={3} direction={{ base: 'column', md: 'row' }}>
          <InputGroup size="lg" flex="1">
            <InputLeftElement pointerEvents="none">🔍</InputLeftElement>
            <Input
              placeholder="Search titles, descriptions or people…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="white"
              borderRadius="full"
              boxShadow="soft"
              border="none"
            />
          </InputGroup>
          <Select
            size="lg"
            w={{ base: '100%', md: '180px' }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            bg="white"
            borderRadius="full"
            boxShadow="soft"
            border="none"
            aria-label="Sort order"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </Select>
        </Flex>

        <Wrap spacing={2}>
          {filterChips.map((c) => {
            const active = activeCategory === c.value;
            return (
              <WrapItem key={c.value}>
                <Button
                  size="sm"
                  onClick={() => setActiveCategory(c.value)}
                  variant={active ? 'solid' : 'ghost'}
                  bg={active ? undefined : 'whiteAlpha.800'}
                  boxShadow={active ? 'soft' : 'none'}
                  aria-pressed={active}
                >
                  {c.emoji} {c.value}
                  <Text as="span" ml={1.5} opacity={0.6} fontWeight={500}>
                    {counts[c.value] || 0}
                  </Text>
                </Button>
              </WrapItem>
            );
          })}
        </Wrap>
      </VStack>

      {/* Feed */}
      {loading ? (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </SimpleGrid>
      ) : error ? (
        <VStack py={16} spacing={3} textAlign="center" bg="white" borderRadius="card" boxShadow="soft">
          <Text fontSize="5xl">🔌</Text>
          <Heading size="md">Couldn't load recommendations</Heading>
          <Text color="gray.500">{error}</Text>
          <Button onClick={() => { setLoading(true); fetchRecs(); }}>Try again</Button>
        </VStack>
      ) : visibleRecs.length === 0 ? (
        <VStack py={16} spacing={3} textAlign="center" bg="whiteAlpha.700" borderRadius="card">
          <Text fontSize="5xl">{recs.length === 0 ? '🌱' : '🔎'}</Text>
          <Heading size="md">
            {recs.length === 0 ? 'No recommendations yet' : 'No matches'}
          </Heading>
          <Text color="gray.500">
            {recs.length === 0
              ? 'Be the first to put people on to something.'
              : 'Try a different search or category.'}
          </Text>
          {recs.length === 0 ? (
            <Button onClick={handleShareClick}>Share the first one</Button>
          ) : (
            <Button variant="ghost" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
              Clear filters
            </Button>
          )}
        </VStack>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
          <AnimatePresence>
            {visibleRecs.map((rec, i) => (
              <RecommendationItem
                key={rec._id}
                rec={rec}
                index={i}
                isOwner={isOwner(rec)}
                onDeleted={(id) => setRecs((prev) => prev.filter((r) => r._id !== id))}
              />
            ))}
          </AnimatePresence>
        </SimpleGrid>
      )}

      <CreateRecommendation
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
        onCreated={fetchRecs}
        onAuthExpired={handleAuthExpired}
      />
    </Container>
  );
};

export default HomePage;
