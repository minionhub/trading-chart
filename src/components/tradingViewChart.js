import React, {
  useEffect,
  useRef,
} from 'react';

let tvScriptLoadingPromise;

const TradingDashboard = (props) => {
  const {
    value,
  } = props;

  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (document.getElementById('tradingview-widget') && 'TradingView' in window) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "BINANCE:BTCUSD",
          interval: '1',
          timezone: 'America/New_York',
          theme: 'dark',
          style: '1',
          locale: 'en',
          enable_publishing: false,
          allow_symbol_change: false,
          backgroundColor: "#2D2D2D",
          save_image: false,
          container_id: 'tradingview-widget',
          outerHeight: 400
        });
      }
    }
  }, [value]);

  return ( <div className = 'tradingview-widget-container'>
    <div id='tradingview-widget' style={{ height: 400 }} />
    </div>
  );
};

export default TradingDashboard;
