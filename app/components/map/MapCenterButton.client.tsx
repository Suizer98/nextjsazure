import { Button } from '@nextui-org/react'
import React from 'react'

type RecenterButtonProps = {
  onClick: () => void
}

const MapCenterButton: React.FC<RecenterButtonProps> = ({ onClick }) => {
  return (
    <div className="absolute bottom-6 right-4">
      <Button
        onPress={onClick}
        style={{
          backgroundColor: 'white',
          width: '40px',
          height: '40px',
          minWidth: 'unset',
          padding: '0'
        }}
        aria-label="Recenter Map"
      >
        ↑
      </Button>
    </div>
  )
}

export default MapCenterButton
