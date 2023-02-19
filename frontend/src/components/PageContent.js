import classes from './PageContent.module.css';

function PageContent(props) {
    
    const {title, children} = props;

  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;