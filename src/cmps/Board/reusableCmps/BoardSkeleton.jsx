import { Skeleton } from "monday-ui-react-core"

export function BoardSkeleton(){


    return (
        <div className="monday-storybook-skeleton_row-box">
            <div className="monday-storybook-skeleton_column-box">
                <Skeleton type={Skeleton.types.TEXT} size={Skeleton.sizes.TEXT.H1} />
                <>H1</>
            </div>
            <div className="monday-storybook-skeleton_column-box">
                <Skeleton type={Skeleton.types.TEXT} size={Skeleton.sizes.TEXT.H2} />
                <>H2</>
            </div>
            <div className="monday-storybook-skeleton_column-box">
                <Skeleton type={Skeleton.types.TEXT} size={Skeleton.sizes.TEXT.SMALL} />
                <>Paragraph</>
            </div>
        </div>
    )
}
