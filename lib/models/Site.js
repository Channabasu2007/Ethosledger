import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  host: String,
  title: String,
  score: Number,
  category: String,
  rank: Number,
  image: String,
  metrics: Object,
}, { timestamps: true, collection: 'hallofshame' });

export default mongoose.models.Site || mongoose.model('Site', SiteSchema);
