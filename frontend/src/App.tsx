import { Button } from "./Components/Button";
import { Card } from "./Components/Cards";
import { PlusIcon } from "./icons/PlusIcons";
import { ShareIcon } from "./icons/ShareIcon";
function App() {
  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
        <Button
          varient="primary"
          text="Add Content"
          startIcon={<PlusIcon />}
        ></Button>
        <Button
          varient="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />}
        ></Button>
      </div>

      <div className="flex gap-4">
        <Card
          type="twitter"
          title="new posts"
          link="https://x.com/Bhavani_00007/status/2036430903208218994"
        />
        <Card
          type="youtube"
          title="best py course"
          link="https://www.youtube.com/watch?v=Rq5gJVxz55Q"
        />
      </div>
    </div>
  );
}

export default App;
