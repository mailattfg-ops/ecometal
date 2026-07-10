const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://schoabvyfhwgdifegozc.supabase.co',
  'sb_publishable_4AIifkgqQKVmEKapC8XePg_XHD-hbF8'
);

async function checkBuckets() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error("Error fetching buckets:", error.message);
  } else {
    console.log("Buckets found:");
    console.log(data.map(b => b.name));
  }
}

checkBuckets();
