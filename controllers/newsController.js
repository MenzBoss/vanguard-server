const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const News = require('../models/News');

// GET /api/news
const getNews = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const category = req.query.category;
  const filter = { published: true };
  if (category) filter.category = category;

  const total = await News.countDocuments(filter);
  const news = await News.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ news, page, pages: Math.ceil(total / limit), total });
});

// GET /api/news/featured
const getFeaturedNews = asyncHandler(async (req, res) => {
  const news = await News.find({ published: true, featured: true }).sort({ createdAt: -1 }).limit(6);
  res.json(news);
});

// GET /api/news/:slug
const getNewsBySlug = asyncHandler(async (req, res) => {
  const article = await News.findOne({ slug: req.params.slug, published: true });
  if (!article) return res.status(404).json({ message: 'Article not found' });

  const related = await News.find({
    category: article.category,
    published: true,
    _id: { $ne: article._id },
  })
    .sort({ createdAt: -1 })
    .limit(3);

  res.json({ article, related });
});

// POST /api/news (admin)
const createNews = asyncHandler(async (req, res) => {
  const { title, content, excerpt, category, featured, published, image } = req.body;
  const slug = slugify(title, { lower: true, strict: true });
  const article = await News.create({ title, slug, content, excerpt, category, featured, published, image });
  res.status(201).json(article);
});

// PUT /api/news/:id (admin)
const updateNews = asyncHandler(async (req, res) => {
  const article = await News.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  if (req.body.title) req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  Object.assign(article, req.body);
  await article.save();
  res.json(article);
});

// DELETE /api/news/:id (admin)
const deleteNews = asyncHandler(async (req, res) => {
  const article = await News.findByIdAndDelete(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json({ message: 'Article deleted' });
});

// GET /api/news/admin/all (admin)
const getAllNewsAdmin = asyncHandler(async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

module.exports = { getNews, getFeaturedNews, getNewsBySlug, createNews, updateNews, deleteNews, getAllNewsAdmin };
