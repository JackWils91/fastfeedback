import { auth } from '@/lib/firebase-admin';
import { getUserSites } from '@/lib/db-admin';
import { logger, formatObjectKeys } from '@/utils/logger';
import { deleteSite } from '@/lib/db';

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { siteId } = req.query;
    const { sites } = await deleteSite(siteId);

    res.status(200).json({ sites });
  } catch (error) {
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      error.message
    );

    res.status(500).json({ error });
  }
};
