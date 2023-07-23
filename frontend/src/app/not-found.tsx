import { Button } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 bg-opacity-50 bg-black text-white font-bold">
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black gap-3 text-white font-bold flex-col">
        <h1 className="text-2xl">404 - Not Found</h1>
        <Link href="/" passHref>
          <Button startIcon={<HomeIcon />} color="primary" variant="contained">
            Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
}
